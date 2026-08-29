import { useState, useRef, useCallback } from "react";
import { useToast } from "heroui-native";
import { useRouter } from "expo-router";
import { CameraView, type FlashMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useSaveMeal } from "./use-meals";
import { useAnalyzeMeal } from "./use-analyze";
import { Linking } from "react-native";
import { type MealAnalysisResponse } from "@calorie-ai-app/auth/schemas/meal";
import type { MealRecord } from "@/types";
import { mapAnalysisToSavePayload } from "@/lib/api-client";

type PermissionAlert = {
  title: string;
  description: string;
};

export const useScan = () => {
  const [flash, setFlash] = useState<FlashMode>("off");
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [permissionAlert, setPermissionAlert] =
    useState<PermissionAlert | null>(null);
  const [hasSavedCurrentAnalysis, setHasSavedCurrentAnalysis] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const saveMeal = useSaveMeal();
  const analyzeMeal = useAnalyzeMeal();

  const resetScan = useCallback(() => {
    setIsTakingPicture(false);
    setShowResult(false);
    setCapturedImageUrl(null);
    setHasSavedCurrentAnalysis(false);
    analyzeMeal.reset();
  }, [analyzeMeal]);

  const toggleFlash = useCallback(() => {
    setFlash(flash === "off" ? "on" : "off");
  }, [flash]);

  const handleImageReady = useCallback((uri: string) => {
    setCapturedImageUrl(uri);
    setHasSavedCurrentAnalysis(false);
  }, []);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current) return;
    setIsTakingPicture(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      if (photo.uri) {
        handleImageReady(photo.uri);
      }
    } catch (error) {
      console.error("Failed to take picture", error);
      toast.show({
        label: error instanceof Error ? error.message : String(error),
        variant: "danger",
        actionLabel: "X",
        onActionPress: ({ hide }) => hide(),
      });
    } finally {
      setIsTakingPicture(false);
    }
  }, [isTakingPicture, handleImageReady]);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      toast.show({
        label: "Camera permission not granted",
        variant: "warning",
        actionLabel: "Go to settings",
        onActionPress: ({ hide }) => {
          hide();
          Linking.openSettings();
        },
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0].uri) {
      handleImageReady(result.assets[0].uri);
    }
  }, [handleImageReady]);

  const navigateToMeal = useCallback(
    (mealId: string) => {
      resetScan();
      router.push({
        pathname: "/meal/[id]",
        params: { id: mealId, source: "result" },
      });
    },
    [resetScan, router],
  );

  const handleAnalyze = useCallback(() => {
    if (!capturedImageUrl) return;

    setHasSavedCurrentAnalysis(false);

    analyzeMeal.mutate(
      { uri: capturedImageUrl },
      {
        onSuccess: (data) => {
          const savePayload = mapAnalysisToSavePayload(
            data.analysis as unknown as MealAnalysisResponse,
            capturedImageUrl,
          );

          saveMeal.mutate(savePayload, {
            onSuccess: (result: { success: boolean; meal: MealRecord }) => {
              setHasSavedCurrentAnalysis(true);
              navigateToMeal(result.meal.id);
            },
            onError: () => {
              setShowResult(true);
              toast.show({
                variant: "danger",
                label: "Could not save meal",
                description:
                  "Analysis worked, but storing it failed. You can retry from the sheet.",
                actionLabel: "Dismiss",
                onActionPress: ({ hide }) => hide(),
              });
            },
          });
        },
        onError: (error) => {
          console.error("[useScanFlow] Analysis failed:", error);
          setCapturedImageUrl(null);
          setHasSavedCurrentAnalysis(false);
          toast.show({
            variant: "danger",
            label: "Analysis failed",
            description:
              "We couldn't analyze that image. Please try again with a clearer photo.",
            actionLabel: "Dismiss",
            onActionPress: ({ hide }) => hide(),
          });
        },
      },
    );
  }, [capturedImageUrl, analyzeMeal, saveMeal, navigateToMeal, toast]);

  const handleRetake = useCallback(() => {
    setCapturedImageUrl(null);
    setHasSavedCurrentAnalysis(false);
    analyzeMeal.reset();
  }, [analyzeMeal]);

  const handleSaveToDiary = useCallback(() => {
    const analysis = analyzeMeal.data?.analysis;
    if (!analysis || hasSavedCurrentAnalysis) return;

    saveMeal.mutate(
      mapAnalysisToSavePayload(
        analysis as unknown as MealAnalysisResponse,
        capturedImageUrl ?? undefined,
      ),
      {
        onSuccess: (result: { success: boolean; meal: MealRecord }) => {
          setHasSavedCurrentAnalysis(true);
          navigateToMeal(result.meal.id);
        },
        onError: () => {
          toast.show({
            variant: "danger",
            label: "Save failed",
            description: "Please check the server logs and try saving again.",
            actionLabel: "Dismiss",
            onActionPress: ({ hide }) => hide(),
          });
        },
      },
    );
  }, [
    analyzeMeal,
    capturedImageUrl,
    hasSavedCurrentAnalysis,
    saveMeal,
    navigateToMeal,
    toast,
  ]);

  const handleResultsOpenChange = useCallback(
    (open: boolean) => {
      setShowResult(open);
      if (!open) {
        setCapturedImageUrl(null);
        setHasSavedCurrentAnalysis(false);
        analyzeMeal.reset();
      }
    },
    [analyzeMeal],
  );

  return {
    cameraRef,
    flash,
    isTakingPicture,
    isAnalyzing: analyzeMeal.isPending,
    showResult,
    capturedImageUrl,
    hasSavedCurrentAnalysis,
    analysisData: analyzeMeal.data?.analysis
      ? (analyzeMeal.data.analysis as unknown as MealAnalysisResponse)
      : null,
    isSaving: saveMeal.isPending,
    toggleFlash,
    takePicture,
    pickImage,
    handleAnalyze,
    handleRetake,
    handleSaveToDiary,
    handleResultsOpenChange,
    resetScan,
  };
};

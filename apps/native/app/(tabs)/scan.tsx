import { View, StyleSheet } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";
import { useScan } from "@/hooks/use-scan";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CameraPermissionGate } from "@/components/containers/meals/camera-permission-gate";
import ImageReviewOverlay from "@/components/containers/meals/image-review-overlay";
import ScanHeader from "@/components/containers/meals/scan-header";
import ScanFrameOverlay from "@/components/containers/meals/scan-overlay";
import ScanBottomControls from "@/components/containers/meals/scan-button-controls";
import ScanAnalyzingOverlay from "@/components/containers/meals/scan-analyze-overlay";
import AnalysisResultsSheet from "@/components/containers/meals/analyzing-result";

const Scan = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    cameraRef,
    flash,
    isTakingPicture,
    isAnalyzing,
    showResult,
    capturedImageUrl,
    hasSavedCurrentAnalysis,
    analysisData,
    isSaving,
    toggleFlash,
    takePicture,
    pickImage,
    handleAnalyze,
    handleRetake,
    handleSaveToDiary,
    handleResultsOpenChange,
  } = useScan();

  if (!cameraPermission || !cameraPermission.granted) {
    return (
      <CameraPermissionGate
        isLoading={!cameraPermission}
        isGranted={cameraPermission?.granted ?? false}
        onRequestPermission={requestCameraPermission}
      />
    );
  }

  if (capturedImageUrl && !isAnalyzing && !showResult) {
    return (
      <ImageReviewOverlay
        imageUri={capturedImageUrl}
        isAnalyzing={isAnalyzing}
        onAnalyze={handleAnalyze}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <View className="flex-1 bg-background">
      <CameraView
        ref={cameraRef}
        facing="back"
        flash={flash}
        mode="picture"
        active={!isTakingPicture}
        style={StyleSheet.absoluteFill}
      />
      <ScanHeader topInset={insets.top} onClose={() => router.back()} />
      <ScanFrameOverlay />

      <ScanBottomControls
        isTakingPicture={isTakingPicture || isAnalyzing}
        onTakePicture={takePicture}
        onPickImage={pickImage}
        flash={flash}
        onToggleFlash={toggleFlash}
      />

      <ScanAnalyzingOverlay visible={isAnalyzing} />

      <AnalysisResultsSheet
        isOpen={showResult}
        onOpenChange={handleResultsOpenChange}
        analysis={analysisData}
        isSaving={isSaving}
        isSaved={hasSavedCurrentAnalysis}
        onSave={handleSaveToDiary}
      />
    </View>
  );
};

export default Scan;

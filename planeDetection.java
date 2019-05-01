// Imperative approach using Java.
// The Objective C pattern would look very similar to this.

final ARScene scene = new ARScene();
scene.setListener(new ARScene.Listener() {
  public void onAnchorFound(ARAnchor anchor, ARNode arNode) {
    // Make sure anchor is a place
    if (anchor.getType() == ARAnchor.Typea.PLANE) {
      ARPlaneAnchor planeAnchor = (ARPlaneAnchor) anchor;

      // Ensure this is a horizontal plane of the right size
      if (planeAnchor.getAlignment() == ARPlaneAnchor.Alignment.HORIZONTAL &&
          planeAnchor.getWidth() > 1.0 && planeAnchor.getHeight() > 1.0) {

        Object3D dinosaur = new Object3D();
        dinosaur.loadModel("file://android-asset/dinosaur.fbx", Object3D.Type.FBS);
        arNode.addChildNode(dinosaur);
      }
    }
  }
});

// What it would look like it React (declarative)

<ViroARPlane minHeight={1.0} minWidth={1.0} alignment="Horizontal">
  <Viro3DObject
    source={require("./res/dinosaur.vrx")}
    type="VRX"
  />
</ViroARPlane>

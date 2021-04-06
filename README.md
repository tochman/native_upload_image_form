# Upload an image and get a new image in return

* Input field for height
* File upload
* Submit
* Receives an image
* Show this image

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { GLView } from 'expo-gl';
import { THREE } from 'expo-three';
import ExpoTHREE from 'expo-three';

const ObjectReceiver = () => {

  const _onGLContextCreate = async gl => {
    scene = new THREE.Scene();
    camera = new THREE.Camera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    scene.add(camera);
    renderer = new ExpoTHREE.Renderer({ gl });
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0xff0f00 });
    obj = new THREE.Mesh(geometry, material);
    edges = new THREE.EdgesGeometry(geometry);
    line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );

    scene.add(line);
    scene.add(obj);
    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    //geometry.rotation.x += 0.01;
    //geometry.rotation.y += 0.01;
    renderer.render(scene, camera);
  };


  return (
    <View style={styles.container}>
      <GLView
        style={{ width: 300, height: 300 }}
        onContextCreate={_onGLContextCreate}
      />
    </View>
  );
}

export default ObjectReceiver

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
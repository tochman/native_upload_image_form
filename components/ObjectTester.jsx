import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Renderer } from 'expo-three';
import { THREE } from 'expo-three';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

global.THREE = global.THREE || THREE;


const ObjectTester = () => {

  const onContextCreate = async gl => {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0.5, 0, 0.5)

    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const asset = Asset.fromModule(require('../assets/avatar.obj'));
    await asset.downloadAsync();
    const loader = new OBJLoader();
    loader.load(asset.localUri, group => {
      // Model loaded...
    });

    gl.flush();
    gl.endFrameEXP();


  }

  // Make our canvas background black


  return (
    <View>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
    </View>
  )
}

export default ObjectTester

const styles = StyleSheet.create({})


// <GLView
//         style={{ width: 200, height: 400 }}
//         onContextCreate={async (gl) => {
//           gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//           gl.clearColor(0, 1, 1, 1);

//           const renderer = new Renderer({ gl });
//           renderer.setSize(200, 400);

//           // Create an Asset from a resource
//           const asset = Asset.fromModule(require('../assets/avatar.obj'));
//           await asset.downloadAsync();
//           const loader = new OBJLoader();
//           loader.load(asset.localUri, group => {
//             // Model loaded...
//           });

//           const vert = gl.createShader(gl.VERTEX_SHADER);
//           gl.shaderSource(
//             vert,
//             `
//             void main(void) {
//               gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
//               gl_PointSize = 150.0;
//             }
//           `
//           );
//           gl.compileShader(vert);

//           const frag = gl.createShader(gl.FRAGMENT_SHADER);
//           gl.shaderSource(
//             frag,
//             `
//             void main(void) {
//               gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//             }
//           `
//           );
//           gl.compileShader(frag);

//           const program = gl.createProgram();
//           gl.attachShader(program, vert);
//           gl.attachShader(program, frag);
//           gl.linkProgram(program);
//           gl.useProgram(program);

//           gl.clear(gl.COLOR_BUFFER_BIT);
//           gl.drawArrays(gl.POINTS, 0, 1);

//           gl.flush();
//           gl.endFrameEXP();
//         }}


//       />
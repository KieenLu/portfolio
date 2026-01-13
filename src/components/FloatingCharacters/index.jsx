"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { CHARACTERS } from "./helper";

const FloatingCharacters = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const textObjectsRef = useRef([]);
    const mouseRef = useRef(new THREE.Vector2(0, 0));
    const cubeRenderTargetRef = useRef(null);
    const shadowTextureRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(0x000000, 0);
        // Enhanced shadow settings
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.needsUpdate = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.outputEncoding = THREE.sRGBEncoding;

        sceneRef.current = scene;
        rendererRef.current = renderer;

        mountRef.current.appendChild(renderer.domElement);

        // Enhanced lighting setup
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(8, 15, 10);
        directionalLight.castShadow = false;
        scene.add(directionalLight);

        // Add ambient light for softer shadows
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        // Add rim light for better definition
        const rimLight = new THREE.DirectionalLight(0x64a4df, 0.5);
        rimLight.position.set(-5, 2, -5);
        scene.add(rimLight);

        camera.position.set(0, 0, 12);

        const loader = new FontLoader();

        const createFakeShadowTexture = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext("2d");

            const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            gradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
            gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.2)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 128, 128);

            return new THREE.CanvasTexture(canvas);
        };

        const shadowTexture = createFakeShadowTexture();
        shadowTextureRef.current = shadowTexture;

        const createText = (char, position, size, rotation) => {
            loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
                const geometry = new TextGeometry(char, {
                    font: font,
                    size: size,
                    height: 0.4, // Increased for better shadows
                    curveSegments: 48,
                    bevelEnabled: true,
                    bevelThickness: 0.1,
                    bevelSize: 0.04,
                    bevelOffset: 0,
                    bevelSegments: 6,
                });

                // Material with CubeCamera environment map
                const material = new THREE.MeshStandardMaterial({
                    color: 0x808080, // Gray color for the text
                    metalness: 0.8, // Increased for better reflections
                    roughness: 0.3, // Decreased for more reflective surface
                    envMapIntensity: 0.6, // Increased for more visible reflections
                });

                const textMesh = new THREE.Mesh(geometry, material);
                // Disable shadow casting and receiving
                textMesh.castShadow = false;
                textMesh.receiveShadow = false;

                textMesh.position.set(position.x, position.y, position.z);

                if (rotation) {
                    textMesh.rotation.x = rotation.x;
                    textMesh.rotation.y = rotation.y;
                    textMesh.rotation.z = rotation.z;
                }

                const shadowPlane = new THREE.Mesh(
                    new THREE.PlaneGeometry(size * 1.5, size * 1.5),
                    new THREE.MeshBasicMaterial({
                        map: shadowTexture,
                        transparent: true,
                        opacity: 0.4,
                        depthWrite: false,
                    })
                );

                shadowPlane.rotation.x = -Math.PI / 2;
                shadowPlane.position.set(position.x, -2.8, position.z);

                geometry.computeBoundingBox();
                const centerOffset = geometry.boundingBox.getCenter(new THREE.Vector3());
                textMesh.geometry.translate(-centerOffset.x, -centerOffset.y, -centerOffset.z);

                textMesh.userData = {
                    originalPosition: { ...position },
                    floatSpeedY: 0.3 + Math.random() * 0.2,
                    floatAmountY: 0.2 + Math.random() * 0.1,
                    floatOffsetY: Math.random() * Math.PI * 2,
                    floatSpeedX: 0.2 + Math.random() * 0.1,
                    floatAmountX: 0.1 + Math.random() * 0.05,
                    floatOffsetX: Math.random() * Math.PI * 2,
                    floatSpeedZ: 0.25 + Math.random() * 0.15,
                    floatAmountZ: 0.1 + Math.random() * 0.05,
                    floatOffsetZ: Math.random() * Math.PI * 2,
                    rotateSpeed: 0.0005,
                    rotateAmount: Math.PI / 4,
                    rotateDirection: 1,
                    mouseSensitivity: 0.015 + Math.random() * 0.01,
                    shadowPlane: shadowPlane,
                };

                textObjectsRef.current.push(textMesh);
                scene.add(textMesh);
                scene.add(shadowPlane);
            });
        };

        CHARACTERS.forEach(({ char, position, size, rotation }) => {
            createText(char, position, size, rotation);
        });

        const clock = new THREE.Clock();
        let frameCount = 0;

        const handleMouseMove = (event) => {
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;
            mouseRef.current.x = x * 2 - 1;
            mouseRef.current.y = -(y * 2 - 1);
        };

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            frameCount++;

            textObjectsRef.current.forEach((text) => {
                const baseX =
                    text.userData.originalPosition.x +
                    Math.sin(elapsedTime * text.userData.floatSpeedX + text.userData.floatOffsetX) *
                        text.userData.floatAmountX;

                const baseY =
                    text.userData.originalPosition.y +
                    Math.sin(elapsedTime * text.userData.floatSpeedY + text.userData.floatOffsetY) *
                        text.userData.floatAmountY;

                const baseZ =
                    text.userData.originalPosition.z +
                    Math.sin(elapsedTime * text.userData.floatSpeedZ + text.userData.floatOffsetZ) *
                        text.userData.floatAmountZ;

                const mouseEffect = text.userData.mouseSensitivity;
                const finalX = baseX + mouseRef.current.x * mouseEffect;
                const finalY = baseY + mouseRef.current.y * mouseEffect;

                text.position.set(finalX, finalY, baseZ);

                const shadowPlane = text.userData.shadowPlane;
                if (shadowPlane) {
                    shadowPlane.position.x = finalX;
                    shadowPlane.position.z = baseZ;

                    const heightDiff = finalY - -2.8;
                    const shadowScale = 1 + heightDiff * 0.15;
                    const shadowOpacity = Math.max(0.2, 0.5 - heightDiff * 0.08);

                    shadowPlane.scale.set(shadowScale, shadowScale, 1);
                    shadowPlane.material.opacity = shadowOpacity;
                }

                text.rotation.y +=
                    text.userData.rotateDirection *
                    text.userData.rotateAmount *
                    text.userData.rotateSpeed;

                if (Math.abs(text.rotation.y) > text.userData.rotateAmount) {
                    text.userData.rotateDirection *= -1;
                }
            });

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            mountRef.current?.removeChild(renderer.domElement);

            textObjectsRef.current.forEach((text) => {
                text.geometry.dispose();
                text.material.dispose();

                if (text.userData.shadowPlane) {
                    text.userData.shadowPlane.geometry.dispose();
                    text.userData.shadowPlane.material.dispose();
                    scene.remove(text.userData.shadowPlane);
                }
            });

            if (shadowTextureRef.current) {
                shadowTextureRef.current.dispose();
            }

            // Dispose CubeCamera resources
            if (cubeRenderTargetRef.current) {
                cubeRenderTargetRef.current.dispose();
            }

            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default FloatingCharacters;

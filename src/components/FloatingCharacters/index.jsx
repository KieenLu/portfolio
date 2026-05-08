"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

import { useDevice } from "@/hooks/useDevice";
import { usePageConcept } from "@/hooks/usePageConcept";

const FloatingCharacters = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const textObjectsRef = useRef([]);
    const mouseRef = useRef(new THREE.Vector2(0, 0));
    const shadowTextureRef = useRef(null);
    const requestRef = useRef();

    const { floatingCharactersConfig, listCharacters } = usePageConcept();
    const { device, width, height } = useDevice();

    const textColor = floatingCharactersConfig?.textColor;
    const rimLightColor = floatingCharactersConfig?.rimLightColor;
    const shadowOpacity = floatingCharactersConfig?.shadowOpacity;

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputEncoding = THREE.sRGBEncoding;

        sceneRef.current = scene;
        rendererRef.current = renderer;

        mountRef.current.appendChild(renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(8, 15, 10);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        const rimLight = new THREE.DirectionalLight(rimLightColor, 0.5);
        rimLight.position.set(-5, 2, -5);
        scene.add(rimLight);

        const updateCameraZ = () => {
            const aspect = width / height;
            const targetAspect = 16 / 9;

            let baseZ = 12;
            if (device === "tablet") baseZ = 13.5;
            if (device === "mobile") baseZ = 15;

            if (aspect < targetAspect) {
                camera.position.z = baseZ * (targetAspect / aspect) * 0.9;
            } else {
                camera.position.z = baseZ;
            }
        };
        updateCameraZ();

        const loader = new FontLoader();

        const createFakeShadowTexture = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            gradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 128, 128);
            return new THREE.CanvasTexture(canvas);
        };

        const shadowTexture = createFakeShadowTexture();
        shadowTextureRef.current = shadowTexture;

        const createText = (charData) => {
            const {
                char,
                position,
                tabletPosition,
                mobilePosition,
                size,
                tabletSize,
                mobileSize,
                rotation,
            } = charData;

            let finalSize = size;
            let finalPos = position;

            if (device === "tablet") {
                finalSize = tabletSize || size;
                finalPos = tabletPosition || position;
            } else if (device === "mobile") {
                finalSize = mobileSize || size;
                finalPos = mobilePosition || position;
            }

            loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
                const geometry = new TextGeometry(char, {
                    font: font,
                    size: finalSize,
                    height: 0.4,
                    curveSegments: 48,
                    bevelEnabled: true,
                    bevelThickness: 0.1,
                    bevelSize: 0.04,
                    bevelSegments: 6,
                });

                const material = new THREE.MeshStandardMaterial({
                    color: textColor,
                    metalness: 0.8,
                    roughness: 0.3,
                    envMapIntensity: 0.6,
                });

                const textMesh = new THREE.Mesh(geometry, material);
                textMesh.position.set(finalPos.x, finalPos.y, finalPos.z);

                if (rotation) {
                    textMesh.rotation.set(rotation.x, rotation.y, rotation.z);
                }

                const shadowPlane = new THREE.Mesh(
                    new THREE.PlaneGeometry(finalSize * 1.5, finalSize * 1.5),
                    new THREE.MeshBasicMaterial({
                        map: shadowTexture,
                        transparent: true,
                        opacity: shadowOpacity,
                        depthWrite: false,
                    })
                );
                shadowPlane.rotation.x = -Math.PI / 2;
                shadowPlane.position.set(finalPos.x, -2.8, finalPos.z);

                geometry.computeBoundingBox();
                const centerOffset = geometry.boundingBox.getCenter(new THREE.Vector3());
                textMesh.geometry.translate(-centerOffset.x, -centerOffset.y, -centerOffset.z);

                textMesh.userData = {
                    originalPosition: { ...finalPos },
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

        listCharacters.forEach((charData) => createText(charData));

        const clock = new THREE.Clock();
        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / width) * 2 - 1;
            mouseRef.current.y = -(event.clientY / height) * 2 + 1;
        };

        const animate = () => {
            requestRef.current = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            textObjectsRef.current.forEach((text) => {
                const ud = text.userData;
                const baseX =
                    ud.originalPosition.x +
                    Math.sin(elapsedTime * ud.floatSpeedX + ud.floatOffsetX) * ud.floatAmountX;
                const baseY =
                    ud.originalPosition.y +
                    Math.sin(elapsedTime * ud.floatSpeedY + ud.floatOffsetY) * ud.floatAmountY;
                const baseZ =
                    ud.originalPosition.z +
                    Math.sin(elapsedTime * ud.floatSpeedZ + ud.floatOffsetZ) * ud.floatAmountZ;

                const finalX = baseX + mouseRef.current.x * ud.mouseSensitivity;
                const finalY = baseY + mouseRef.current.y * ud.mouseSensitivity;

                text.position.set(finalX, finalY, baseZ);

                if (ud.shadowPlane) {
                    ud.shadowPlane.position.x = finalX;
                    ud.shadowPlane.position.z = baseZ;
                    const heightDiff = finalY - -2.8;
                    ud.shadowPlane.material.opacity = Math.max(
                        0.1,
                        shadowOpacity - heightDiff * 0.08
                    );
                }

                text.rotation.y += ud.rotateDirection * ud.rotateAmount * ud.rotateSpeed;
                if (Math.abs(text.rotation.y) > ud.rotateAmount) ud.rotateDirection *= -1;
            });

            renderer.render(scene, camera);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            mountRef.current?.removeChild(renderer.domElement);

            textObjectsRef.current.forEach((t) => {
                t.geometry.dispose();
                t.material.dispose();
                if (t.userData.shadowPlane) {
                    t.userData.shadowPlane.geometry.dispose();
                    t.userData.shadowPlane.material.dispose();
                }
            });
            renderer.dispose();
            textObjectsRef.current = [];
        };
    }, [device, textColor, rimLightColor, shadowOpacity, listCharacters, width, height]);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default FloatingCharacters;

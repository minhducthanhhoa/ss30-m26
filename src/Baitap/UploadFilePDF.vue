<template>
    <div>
      <input type="file" @change="uploadPdf" accept="application/pdf" />
      <canvas id="pdf-canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref as storageRef, getDownloadURL } from "firebase/storage";
  import { storage } from "@/firebase";
  import * as pdfjsLib from "pdfjs-dist/build/pdf";
  
  function uploadPdf(event) {
    const file = event.target.files[0];
    const storageReference = storageRef(storage, `pdfs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);
  
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log("Upload failed!", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          renderPdf(downloadURL);
        });
      }
    );
  }
  
  function renderPdf(url) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.worker.min.js";
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
  
        const canvas = document.getElementById("pdf-canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  }
  </script>
  
<template>
    <div>
      <input type="file" @change="uploadImages" multiple />
      <ul>
        <li v-for="(status, index) in statuses" :key="index">{{ status }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref as storageRef } from "firebase/storage";
  import { storage } from "@/firebase";
  import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { ref } from 'vue';
  
  const statuses = ref([]);
  
  function uploadImages(event) {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
      const storageReference = storageRef(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageReference, file);
  
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          statuses.value.push(`${file.name}: Upload failed!`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            statuses.value.push(`${file.name}: Upload successful!`);
          });
        }
      );
    });
  }
  </script>
  
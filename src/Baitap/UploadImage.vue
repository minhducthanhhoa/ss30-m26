<template>
    <div>
      <input type="file" @change="uploadImage" />
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref as storageRef } from "firebase/storage";
  import { storage } from "@/firebase";
  import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { ref } from 'vue';
  
  const message = ref('');
  
  function uploadImage(event) {
    const file = event.target.files[0];
    const storageReference = storageRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);
  
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        message.value = "Upload failed!";
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          message.value = "Upload successful!";
        });
      }
    );
  }
  </script>
  
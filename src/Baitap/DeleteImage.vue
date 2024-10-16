<template>
    <div>
      <ul>
        <li v-for="(url, index) in imageUrls" :key="url">
          <img :src="url" alt="Image" />
          <button @click="deleteImage(url, index)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref as storageRef, deleteObject } from "firebase/storage";
  import { ref } from 'vue';
  
  const imageUrls = ref([]);
  
  function deleteImage(url, index) {
    const imageReference = storageRef(storage, url);
    deleteObject(imageReference)
      .then(() => {
        imageUrls.value.splice(index, 1);
        alert("Image deleted successfully!");
      })
      .catch((error) => {
        alert("Failed to delete image!");
        console.error(error);
      });
  }
  </script>
  
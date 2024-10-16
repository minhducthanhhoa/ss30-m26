<template>
    <div>
      <ul>
        <li v-for="url in imageUrls" :key="url">
          <img :src="url" alt="Image" />
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
  import { storage } from "@/firebase";
  import { ref, onMounted } from 'vue';
  
  const imageUrls = ref([]);
  
  onMounted(() => {
    const storageReference = storageRef(storage, "images/");
    listAll(storageReference)
      .then((result) => {
        result.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            imageUrls.value.push(url);
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  </script>
  
<template>
  <div>
    <h1>Upload fire</h1>
    <img :src="imageURL" alt="" />
    <input @change="handleGetFire" type="file" />
    <button @click="handleUpload">Upload</button>
    <button @click="handleSubmit">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase";

const imageURL = ref("");
const file = ref(null);
const dowloadUrl = ref("");
// lấy giá trị trong ô input type file và priview hình ảnh
const handleGetFire = (e) => {
  imageURL.value = URL.createObjectURL(e.target.files[0]);
  file.value = e.target.files[0];
};

// lưu hình ảnh lên firebase storage
const handleUpload = async () => {
  if (!imageURL.value) {
    alert("Chưa có file được chọn");
  } else {
    // Tạo 1 tham chiếu đến folder được lưu trữ trên firebase
    const storageReference = storageRef(storage, `images/${file.value.name}`);
    // lưu hình ảnh trong firebase
    await uploadBytes(storageReference, file.value);
    // lấy url sau khi đã upload xong
    await getDownloadURL(storageReference);
  }
};
const handleSubmit = ()=>{
    console.log("image url", dowloadUrl.value);
}
</script>

<style></style>

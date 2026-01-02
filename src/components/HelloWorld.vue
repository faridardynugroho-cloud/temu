<script setup>
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase"

const testAdd = async () => {
  await addDoc(collection(db, "reports"), {
    type: "lost",
    itemName: "Test Firebase",
    status: "open",
    createdAt: new Date()
  })
}
</script>

<template>
  <button @click="testAdd">
    Test Firebase
  </button>
</template>
npm run d
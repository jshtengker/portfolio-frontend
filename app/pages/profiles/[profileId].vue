<template>
  {{ profileId }}
</template>

<script setup lang="ts">
const profileId = useRoute().params.profileId;
</script>

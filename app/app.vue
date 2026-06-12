<script setup lang="ts">
const colorMode = useColorMode();
const { global } = useAppConfig();

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white",
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", type: "image/png", href: global.picture?.dark! }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>

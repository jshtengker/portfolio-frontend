<template>
  <div>
    <NuxtRouteAnnouncer />
    <NavBar />


    <main class="pt-16 min-h-screen">
      <NuxtPage :transition="{ name: 'fade' }" />
    </main>
    <ContactFooter />
  </div>
</template>

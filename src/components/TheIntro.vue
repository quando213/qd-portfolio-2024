<template>
  <div class="relative min-h-screen bg-gradient-to-r from-primary to-secondary animate-gradient-xy text-white">
    <div class="pt-6">
      <nav class="relative max-w-7xl mx-auto px-4 sm:flex sm:justify-center lg:px-8" aria-label="Global">
        <div class="flex space-x-8">
          <a v-for="item in navigation" :key="item.name" :href="item.href" v-scroll-to="item.scroll" class="text-sm font-body font-medium text-white hover:text-gray-200">{{ item.name }}</a>
        </div>
      </nav>
    </div>

    <main>
      <div class="pt-10 sm:pt-16 lg:pt-8 lg:pb-16 lg:overflow-hidden">
        <div class="mx-auto max-w-7xl mt-32 md:mt-24 px-4 lg:px-8">
          <div class="font-display text-5xl uppercase sm:text-6xl sm:text-center md:text-7xl">
            <div>Hi,</div>
            <div>I'm Quan Do,</div>
            <div class="">web developer.</div>
          </div>
        </div>
      </div>

      <div class="absolute left-0 right-0 bottom-8 text-center">
        <div class="inline-block p-6 rounded-full border border-white sm:opacity-60">
          <ArrowDownIcon class="w-4 h-4 animate-bounce"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {ArrowDownIcon} from "@heroicons/vue/24/solid";

const navigation = [
  { name: 'Work', href: '#', scroll: '#work' },
  { name: 'Contact', href: '#', scroll: '#contact' }
]
</script>

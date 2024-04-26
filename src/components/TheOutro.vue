<template>
  <div class="relative bg-gradient-to-r from-primary to-secondary animate-gradient-xy text-white" id="contact">
    <main>
      <div class="py-10 lg:overflow-hidden">
        <div class="mx-auto max-w-7xl mt-16 mb-24 px-4 lg:px-8">
          <div class="font-display uppercase text-3xl text-center sm:text-4xl md:text-5xl">
            <div class="">Get in touch.</div>
<!--            <div class="">That's it (for now).</div>-->
            <a href="mailto:quando213x@gmail.com"
               class="mt-6 whitespace-nowrap inline-flex items-center justify-center bg-origin-border px-8 py-4 rounded-full border shadow-sm text-xl font-medium cursor-pointer transition-all text-white border-gray-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary focus:ring-opacity-50">
              <EnvelopeIcon class="w-8 h-8 mr-3"/>
              Send me an email
            </a>
          </div>
        </div>
        <div class="font-body text-center text-xs">© {{ currentYear }} Quan Do</div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import {EnvelopeIcon} from "@heroicons/vue/24/solid";

const currentYear = new Date().getFullYear();
</script>

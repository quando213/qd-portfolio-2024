<template>
  <TheIntro />

  <div class="px-4 py-16 bg-black text-white lg:px-8" id="work">
    <div class="mx-auto max-w-7xl">
      <h2 class="pb-16 font-display text-5xl uppercase text-center">My <span class="border-b-2 border-secondary">work</span></h2>
      <div class=" border-white space-y-32">
        <div class="pt-16 grid gap-x-4 gap-y-8 lg:grid-cols-2 xl:grid-cols-3" v-for="work in works">
          <div class="aspect-w-16 aspect-h-9 xl:col-span-2">
            <div class="px-5 py-4 flex justify-center items-end animate-gradient-xy overflow-hidden"
                 :style="{backgroundImage: `linear-gradient(to right, ${work.primary}, ${work.secondary})`}">
              <div class="absolute inset-0.5 bg-black"></div>
              <swiper :modules="[Navigation]"
                      class="max-w-full max-h-full flex justify-start items-center overflow-hidden"
                      navigation
                      loop>
                <swiper-slide v-for="image in work.images">
                  <img :src="image" :alt="work.name">
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="pr-8 lg:px-16">
            <h3 class="inline font-display text-4xl leading-relaxed uppercase border-b-2" :style="{borderColor: work.primary}">{{ work.name }}</h3>
            <div class="mt-6 font-body">{{ work.description }}</div>
            <div class="mt-6 font-body text-sm">
              <p><span class="inline-block mr-1">Role:</span> {{ work.role }}</p>
              <p><span class="inline-block mr-1">Technology:</span> {{ work.technology }}</p>
            </div>
            <a v-if="work.href"
               :href="work.href"
               target="_blank"
               class="mt-6 whitespace-nowrap inline-flex items-center justify-center font-display uppercase bg-origin-border px-4 py-2 rounded-full border border-transparent shadow-sm text-base font-medium cursor-pointer transition-all text-white border-gray-200 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary focus:ring-opacity-50">
              Visit website
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TheOutro />
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import TheIntro from "@/components/TheIntro.vue";
import TheOutro from "@/components/TheOutro.vue";

const works = [
  {
    name: 'Viso Spa',
    description: 'A multi-tenant web application for spa services in the United States, which allows each spa to appear as though it was an independent website. Administrators can customize their spa\'s appearance, services, book appointments and other administrative tasks.',
    role: 'Full stack developer',
    technology: 'Laravel, Laravel Livewire, VueJS, InertiaJS, TailwindCSS',
    // href: 'https://spa.viso.vn',
    images: [ ...Array(5).keys() ].map(i => `images/portfolio/viso-spa/${i + 1}.png`),
    primary: '#11998e',
    secondary: '#38ef7d'
  },
  {
    name: 'ATS Fair',
    description: 'Landing page for an event of ATS, a studying abroad consultant. Allows users to download documents from participating schools, submit information to win scholarships, and chat with representatives from schools during the event.',
    role: 'Front-end developer, Backend maintainer',
    technology: 'NodeJS, VueJS, CSS',
    // href: 'https://fair.ats.org.vn',
    images: [ ...Array(3).keys() ].map(i => `images/portfolio/ats-fair/${i + 1}.png`),
    primary: '#233a81',
    secondary: '#f38e25'
  },
  {
    name: 'B-Cure Laser Vietnam',
    description: 'A multi-language website for the UK originated B-Cure Laser, a medical device, for Vietnam\'s market.',
    role: 'Full stack developer',
    technology: 'Laravel, InertiaJS, TailwindCSS',
    // href: 'https://bcurelaser.com.vn',
    images: [ ...Array(4).keys() ].map(i => `images/portfolio/bcure/${i + 1}.png`),
    primary: '#f68e1e',
    secondary: '#ffb76a'
  },
  {
    name: 'Safe Carz',
    description: 'Car insurance website - my first semester project at FPT Aptech. Built with CSS from the ground up, no template were used to honor the semester\'s objective. NodeJS backend.',
    role: 'Full stack developer',
    technology: 'NodeJS, HTML, CSS, jQuery',
    // href: 'https://safecarz.herokuapp.com',
    images: [ ...Array(5).keys() ].map(i => `images/portfolio/safecarz/${i + 1}.png`),
    primary: '#dae2f4',
    secondary: '#23366f'
  },
  {
    name: 'Vươn Ra Thế Giới',
    description: 'A national competition for children between the age of 6 and 15, in which they submit videos of themselves introducing their provinces\' culture.',
    role: 'Front-end maintainer',
    technology: 'NodeJS, VueJS, CSS',
    // href: 'https://vuonrathegioi.vn',
    images: [ ...Array(4).keys() ].map(i => `images/portfolio/vrtg/${i + 1}.jpg`),
    primary: '#f8c5c5',
    secondary: '#ff7878'
  },
  {
    name: 'Đọc Sách Vì Tương Lai',
    description: 'A national competition for children between the age of 6 and 15, in which they submit videos or themselves reviewing their favorite books.',
    role: 'Front-end maintainer',
    technology: 'NodeJS, VueJS, CSS',
    // href: 'https://docsachvituonglai.com',
    images: [ ...Array(4).keys() ].map(i => `images/portfolio/dsvtl/${i + 1}.png`),
    primary: '#fdc60b',
    secondary: '#ff8400'
  },
]
</script>

<style>
.swiper-button-next, .swiper-button-prev {
  color: white;
  opacity: 0.5;
}

.swiper-wrapper {
  align-items: center;
}
</style>

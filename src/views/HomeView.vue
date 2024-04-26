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
               class="mt-6 whitespace-nowrap inline-flex items-center justify-center font-display uppercase bg-origin-border px-4 py-2 rounded-full border shadow-sm text-base font-medium cursor-pointer transition-all text-white border-gray-200 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary focus:ring-opacity-50">
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
    name: 'GrapeSEED Connect',
    description: 'GrapeSEED Connect is a digital video conferencing software specifically designed to bring GrapeSEED teachers and students together remotely.',
    role: 'Front-end developer, UI designer',
    technology: 'VueJS, SCSS, TailwindCSS, Agora, Canvas',
    href: 'https://remote.grapeseed.com/',
    images: [ ...Array(4).keys() ].map(i => `images/portfolio/gs-connect/${i + 1}.png`),
    primary: '#4f009f',
    secondary: '#4f009f'
  },
  {
    name: 'Westlife The Wild Dreams Tour HCMC',
    description: 'Landing page for Westlife\'s The Wild Dreams Tour in Ho Chi Minh City, Vietnam.',
    role: 'Full stack developer',
    technology: 'Laravel, VueJS, InertiaJS, CSS',
    // href: 'https://climeal.vn/',
    images: [ ...Array(3).keys() ].map(i => `images/portfolio/westlife-tour/${i + 1}.png`),
    primary: '#963155',
    secondary: '#AA5993'
  },
  {
    name: 'Climeal',
    description: 'Landing page for Japan\'s brand Climeal in Vietnam.',
    role: 'Full stack developer',
    technology: 'Laravel, VueJS, InertiaJS, TailwindCSS',
    href: 'https://climeal.vn/',
    images: [ ...Array(4).keys() ].map(i => `images/portfolio/climeal/${i + 1}.png`),
    primary: '#9EB427',
    secondary: '#FBD168'
  },
  {
    name: 'Morinaga Yogurt',
    description: 'Colorful landing page for Morinaga\'s Yogurt in Vietnam.',
    role: 'Full stack developer',
    technology: 'Laravel, VueJS, InertiaJS, TailwindCSS',
    href: 'https://suachuamorinaga.vn/',
    images: [ ...Array(3).keys() ].map(i => `images/portfolio/morinaga-yogurt/${i + 1}.png`),
    primary: '#75BDF5',
    secondary: '#E0F1FF'
  },
  {
    name: 'MaCi Care',
    description: 'Another product of MaCi - MaCi Care, the comprehensive psychological service.',
    role: 'Full stack developer, Project manager',
    technology: 'Laravel, VueJS, InertiaJS, TailwindCSS',
    href: 'https://macicare.vn/',
    images: [ ...Array(5).keys() ].map(i => `images/portfolio/maci-care/${i + 1}.png`),
    primary: '#1A4C5D',
    secondary: '#99ABA6'
  },
  {
    name: '911',
    description: 'Official Website for 90\'s UK boyband 911! This one was fun to make. CSS template and custom built admin portal.',
    role: 'Full stack developer',
    technology: 'Laravel, CSS, JavaScript, InertiaJS',
    href: 'https://911official.com/',
    images: [ ...Array(3).keys() ].map(i => `images/portfolio/911/${i + 1}.png`),
    primary: '#911b23',
    secondary: '#670e15'
  },
  {
    name: 'MaCi Vitamin',
    description: 'A startup focuses on serving health products. In addition to the features of a typical e-commerce website, users can also take a quiz to find the recommended product for themselves.',
    role: 'Full stack developer, Project manager',
    technology: 'Laravel, VueJS, InertiaJS, TailwindCSS',
    href: 'https://maci.vn/vitamin',
    images: [ ...Array(6).keys() ].map(i => `images/portfolio/maci-vitamin/${i + 1}.png`),
    primary: '#29672C',
    secondary: '#203728'
  },
  {
    name: 'SeABank - Doanh nghiệp nữ chủ',
    description: 'Landing page about women-owned businesses for SeABank.',
    role: 'Full stack developer',
    technology: 'Laravel, VueJS, InertiaJS, TailwindCSS',
    // href: 'https://spa.viso.vn',
    images: [ ...Array(4).keys() ].map(i => `images/portfolio/seabank/${i + 1}.png`),
    primary: '#CC0018',
    secondary: '#EBEBEB'
  },
  {
    name: 'MSB Cùng Vươn Tầm',
    description: 'Landing page for a CSR project by MSB (Vietnam Maritime Commercial Joint Stock Bank) which has a forest-themed design with a lot of details.',
    role: 'Full stack developer',
    technology: 'Laravel, VueJS, InertiaJS, TailwindCSS',
    // href: 'https://spa.viso.vn',
    images: [ ...Array(5).keys() ].map(i => `images/portfolio/msb/${i + 1}.png`),
    primary: '#E82921',
    secondary: '#17B005'
  },
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
    name: 'Institute of Fine Arts',
    description: 'An art competition website - my third semester project at FPT Aptech. VueJS frontend with .NET backend.',
    role: 'Team lead, Front-end developer',
    technology: 'VueJS, TailwindCSS, .NET Framework',
    // href: 'https://bcurelaser.com.vn',
    images: [ ...Array(8).keys() ].map(i => `images/portfolio/ifa/${i + 1}.png`),
    primary: '#F0F0F1',
    secondary: '#FFFFFF'
  },
  // {
  //   name: 'Safe Carz',
  //   description: 'Car insurance website - my first semester project at FPT Aptech. Built with CSS from the ground up, no template were used to honor the semester\'s objective. NodeJS backend.',
  //   role: 'Full stack developer',
  //   technology: 'NodeJS, HTML, CSS, jQuery',
  //   // href: 'https://safecarz.herokuapp.com',
  //   images: [ ...Array(5).keys() ].map(i => `images/portfolio/safecarz/${i + 1}.png`),
  //   primary: '#dae2f4',
  //   secondary: '#23366f'
  // },
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

<template>
    <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <!-- <Experience /> -->
        <Education />

        <!-- Blog Section -->
        <Blog />

        <!-- Contact Section -->
        <Contact />

        <!-- Footer -->
        <Footer />
    </main>
</template>

<script setup lang="ts">
import Hero from '../sections/Hero.vue'
import About from '../sections/About.vue'
import Projects from '../sections/Projects.vue'
import Skills from '../sections/Skills.vue'
// import Experience from '../sections/Experience.vue'
import Education from '../sections/Education.vue'
import Blog from '../sections/Blog.vue'
import Contact from '../sections/Contact.vue'
import Footer from '../components/Footer.vue'
</script>

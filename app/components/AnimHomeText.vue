<!-- Animation Home Page -->
<script setup lang="ts">
const lines = [
    'projet',
    'Littera'
]
</script>

<template>
    <div class="animated-brand" aria-label="des lettres et des mots">
        <div v-for="(line, lineIndex) in lines" :key="line" class="animated-line"
            :class="lineIndex === 0 ? 'line-small' : 'line-large'">
            <span v-for="(letter, index) in [...line]" :key="`${lineIndex}-${index}`" class="animated-letter" :style="{
                '--delay': `${lineIndex * 300 + index * 45}ms`
            }">
                {{ letter === ' ' ? '\u00A0' : letter }}
            </span>
        </div>
    </div>
</template>

<!-- Style for the animation -->
<style scoped>
.animated-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    font-family: "Nunito", sans-serif;
    font-weight: 800;
    letter-spacing: -0.04em;
}

/* Première ligne plus petite */
.line-small {
    font-size: clamp(1.3rem, 2vw, 2rem);
    font-weight: 600;
}

/* Deuxième ligne */
.line-large {
    /* margin-top: 20px; */
    font-size: clamp(2.2rem, 4vw, 4.5rem);
    font-weight: 900;
    letter-spacing: 0.04em;
}

/* Chaque lettre */
.animated-letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);

    animation: letter-loop 10s ease-in-out infinite;
    animation-delay: var(--delay);
}

@keyframes letter-loop {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    12% {
        opacity: 1;
        transform: translateY(0);
    }

    30% {
        opacity: 1;
        transform: translateY(0);
    }

    55% {
        opacity: 1;
        transform: translateY(0);
    }

    80% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .animated-letter {
        opacity: 1;
        transform: none;
        animation: none;
    }
}
</style>
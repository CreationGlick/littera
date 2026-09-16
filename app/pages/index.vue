<!-- Home Page -->

<!-- Template -->
<template>
    <main class="min-h-screen bg-base-200 lg:h-screen lg:overflow-hidden">
        <div class="flex min-h-screen flex-col lg:h-full lg:flex-row">

            <!-- Left Side - Animation -->
            <!-- Animation is hidden when mobile IHM -->
            <aside
                class="hidden lg:flex lg:h-full lg:w-[35%] lg:shrink-0 lg:items-center lg:justify-start lg:overflow-hidden lg:bg-base-300 lg:px-16">
                <AnimHomeText />
            </aside>

            <!-- Right Zone -->
            <!-- Always displayed in mobile IHM -->
            <section class="flex w-full flex-1 lg:h-full lg:min-w-0">

                <div class="flex w-full flex-col justify-center px-6 py-8 sm:px-10 lg:h-full lg:px-12 xl:px-16">

                    <!-- Header -->
                    <header class="flex flex-col items-start">

                        <!-- Sub Title -->
                        <div
                            class="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-dark_blue">
                            <span class="h-2 w-2 rounded-full bg-dark_blue"></span>
                            LA BANQUISE
                        </div>

                        <h1 class="mt-2 text-3xl">
                            Bienvenue sur le projet <span class="text-light_blue font-bold">Littera</span>
                        </h1>

                        <p class="mt-4 text-sm leading-relaxed text-base-content/60 sm:text-base">
                            Tous les jours, <span class="font-bold">10 nouvelles questions</span>, à vous de trouver la
                            bonne lettre
                        </p>
                    </header>

                    <!-- Content -->
                    <div class="mt-6 flex flex-col">
                        <section class="group relative w-full overflow-hidden card shadow-xl">

                            <!-- Card -->
                            <div class="relative flex flex-col items-start p-5 sm:p-6 lg:p-7 bg-base-100">

                                <div class="flex w-full flex-wrap items-center justify-between gap-3">
                                    <div class="text-xs font-bold uppercase tracking-[0.15em] text-dark_blue">
                                        Quizz du jour
                                    </div>
                                </div>

                                <h2 class="mt-5 text-2xl font-black capitalize tracking-tight sm:text-2xl">{{
                                    formattedDate }}</h2>

                                <p class="mt-2 max-w-xl text-sm leading-relaxed text-base-content/60">
                                    Trouve la lettre correspondante en essayant d'être le plus rapide possible
                                </p>

                                <NuxtLink :to="todayPath" class="btn btn-start mt-3">
                                    Démarrer le quizz
                                </NuxtLink>
                            </div>
                        </section>

                        <!-- Calendar and How To -->
                        <div class="mt-6 flex flex-col items-center lg:flex-row lg:items-start gap-5">

                            <!-- Calendrier -->
                            <div>
                                <QuizCalendar />
                            </div>

                            <div class="flex flex-col gap-5">
                                <div class="card bg-base-100 shadow-xl" onclick="info_modal.showModal()">
                                    <div class="card-body">

                                        <h2 class="text-lg font-bold">Comment jouer ?</h2>

                                        <p class="text-base-content/60">Tu souhaites jouer à Projet Littera mais tu ne
                                            connais pas les règles ? Pas de panique, clique juste ici pour découvrir les
                                            règles.</p>

                                        <div class="mt-2 font-bold text-dark_blue">
                                            Lire les règles
                                        </div>
                                    </div>
                                </div>

                                <div class="card bg-base-100 shadow-xl">
                                    <div class="card-body">

                                        <h2 class="text-lg font-bold">Des questions ?</h2>

                                        <p class="text-base-content/60">Est-il possible de rejouer aux anciens quizz ?
                                        </p>
                                        <p class="font-bold">Oui, tout à fait, vous pouvez sélectionner un niveau via le
                                            calendrier.</p>
                                        <p></p>
                                        <p class="text-base-content/60">J'ai fait le quizz d'aujourd'hui, quand est le
                                            prochain ?</p>
                                        <p class="font-bold">Projet Littera se met à jour tous les jours à 00.00 UTC+2
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>

        <!-- Modal about rules -->
        <dialog id="info_modal" class="modal">

            <div class="modal-box max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl p-5 sm:max-h-[calc(100vh-3rem)] sm:p-6">

                <div class="flex flex-row items-center gap-5">
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-dark_blue text-xl font-black text-white">
                        ?
                    </div>

                    <h3 class="text-2xl font-black">
                        Comment jouer ?
                    </h3>
                </div>

                <div class="mt-8 flex flex-col gap-6">

                    <div>
                        <div class="mb-2 text-sm font-bold uppercase tracking-wider text-dark_blue">
                            01 — Un jour, un quizz
                        </div>

                        <p class="leading-relaxed text-base-content/70">
                            Chaque jour, une nouvelle série de 10 questions est disponible, le questionnaire est
                            actualisé tous les jours à 00.00 UTC+2.
                        </p>
                    </div>

                    <div>
                        <div class="mb-2 text-sm font-bold uppercase tracking-wider text-dark_blue">
                            02 — Une lettre
                        </div>

                        <p class="leading-relaxed text-base-content/70">
                            Pour chaque question, trouve la lettre correspondante, il n'y a qu'une seule réponse
                            possible pour chaque question.
                        </p>
                    </div>

                    <div class="card bg-base-200 p-5">
                        <p class="font-semibold">
                            Exemple - Quelle lettre est la première de Littera ?
                        </p>

                        <!-- Card Explanation -->
                        <div class="mt-4 flex items-center gap-3">
                            <span class="text-base-content/60">
                                Littera
                            </span>

                            <span class="text-base-content/30">
                                →
                            </span>

                            <span class="text-xl font-black text-white">
                                L
                            </span>
                        </div>
                    </div>

                    <div>
                        <div class="mb-2 text-sm font-bold uppercase tracking-wider text-dark_blue">
                            03 — 10 secondes pour répondre
                        </div>

                        <p class="leading-relaxed text-base-content/70">
                            Attention, vous n'avez que 10 secondes pour répondre à chaque question. Dès lors qu'une
                            réponse est sélectionnée, le temps s'arrête et le jeu vous indique si vous avez eu la bonne
                            réponse ou non.
                        </p>
                    </div>

                    <div>
                        <div class="mb-2 text-sm font-bold uppercase tracking-wider text-dark_blue">
                            04 — Être le plus rapide
                        </div>

                        <p class="leading-relaxed text-base-content/70">
                            Soyez le plus rapide possible en répondant correctement aux questions, une moyenne de votre
                            temps est disponible à la fin du quizz.
                        </p>
                    </div>

                </div>

                <div class="modal-action mt-8">
                    <form method="dialog">
                        <button class="btn btn-start">
                            J'ai compris
                        </button>
                    </form>
                </div>

            </div>

            <form method="dialog" class="modal-backdrop">
                <button>fermer</button>
            </form>
        </dialog>
    </main>
</template>

<!-- Script Setup -->
<script setup lang="ts">

// Get today Date
const today = new Date()

// Formatted Date
const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).format(today)


// Path construction
const todayPath = `/quizz/${today.getFullYear()}-${String(
    today.getMonth() + 1
).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
</script>
<template>
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide class="flex-shrink-0"/>
      <article class="main" p="4">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in" appear>
                <component :is="Component" />
            </transition>
        </router-view>
      </article>
    </div>
</template>

<style lang="scss" scoped>
.main {
    box-sizing: border-box;
    width: calc(100vw - var(--ep-menu-icon-width) - var(--ep-menu-base-level-padding) * 2 );
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
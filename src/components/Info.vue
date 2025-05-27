<script setup>

</script>

<template>
    <div class="info">
        <h2>{{ $t("info.header") }}</h2>
        <!-- 1 -->
        <h3>{{ $t("info.play.title") }}</h3>
        <div style="text-align: start;">
            <p>{{ $t("info.play.content") }}</p>
        </div>

        <!-- 2 -->
        <h3>{{ $t("info.draw.title") }}</h3>
        <div style="text-align: start;">
            <p>{{ $t("info.draw.content.part_1") }}</p>
            <p>{{ $t("info.draw.content.part_2.1") }} <i>{{ $t("info.draw.content.part_2.2") }} <img
                        src="/src/assets/img/red gear.png" class="pixel-art icon"
                        style="animation: 3s rotation linear infinite;"></i> {{ $t("info.draw.content.part_2.3") }}
                <i>{{ $t("info.draw.content.part_2.4") }}</i>, {{ $t("info.draw.content.part_2.5") }}
            </p>
        </div>

        <!-- 3 -->
        <h3>{{ $t("info.discord.title") }}</h3>
        <div style="text-align: start;">
            <p>{{ $t("info.discord.content.1") }}<img src="/src//assets/img/copy.png" class="pixel-art icon"> {{
                $t("info.discord.content.2") }}</p>
        </div>
    </div>
</template>

<style>
@import '/src/assets/main.css';

.info {
    width: 18rem;
    white-space: wrap;
    overflow-y: scroll;
    height: 15rem;
}

.icon {
    height: 1rem;
    vertical-align: middle;
}
</style>
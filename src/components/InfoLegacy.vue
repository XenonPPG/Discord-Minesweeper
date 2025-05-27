<script setup>

</script>

<template>
    <div class="info">
        <h2>Информация</h2>
        <!-- поле -->
        <h3>Настройки поля <img src="/src/assets/img/gear.png" class="pixel-art icon"></h3>
        <div style="text-align: start;">
            <p>Отвечают за параметры игры:
                <br>-размер
                <br>-количество мин
            </p>
        </div>

        <!-- копирование -->
        <h3>Дополнительные настройки <img src="/src/assets/img/red gear.png" class="pixel-art icon"></h3>
        <div style="text-align: start;">
            <p>Настройки текста и поля:
                <br>-дополнительный текст в сообщении
                <br>-открывать ли поле сразу
            </p>
        </div>
    </div>
</template>

<style>
@import '/src/assets/main.css';
.info {
    width: 18rem;

    white-space: wrap;
}

.icon {
    height: 1rem;
    vertical-align: middle;
    animation: rotation 3s linear infinite;
}
</style>
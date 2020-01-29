<template>
    <div>
        <div class="c-relative">
            <span class="c-absolute c-top-0 c-bottom-0 c-left-0 c-px-3 c-flex c-items-center">
                <svg class="c-w-5 c-h-5" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 0H2C.89 0 .01.89.01 2L0 14c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V2c0-1.11-.89-2-2-2zm0 14H2V8h16v6zm0-10H2V2h16v2z" fill="#737373"/></svg>
            </span>
            <input type="text" class="c-w-full c-h-10 c-px-10 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer" name="card_number">
        </div>
        <div class="c-mt-2 c-flex c-items-center">
            <span class="c-text-sm">We accept</span>
            <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
                <img src="../assets/american_express.png">
            </span>
            <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray rounded-sm">
                <img src="../assets/discover.png">
            </span>
            <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
                <img src="../assets/jcb.png">
            </span>
            <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
                <img src="../assets/master_card.png">
            </span>
            <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
                <img src="../assets/visa.png">
            </span>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

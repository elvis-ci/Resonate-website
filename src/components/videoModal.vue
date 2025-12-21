<script setup>
import { ref, onMounted, onUnmounted, nextTick   } from 'vue'

const modalRef = ref(null)
let focusables = []
let first, last

function trapFocus(e){
  if(e.key !== 'Tab') return

  if(e.shiftKey && document.activeElement === first){
    e.preventDefault();
    last.focus()
  }

  if(!e.shiftKey && document.activeElement === last){
    e.preventDefault();
    first.focus()
  }
}
onMounted(async() => {
  await nextTick()
  focusables = modalRef.value.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
  )
  first = focusables[0]
  last = focusables[focusables.length -1]
  first?.focus()

  modalRef.value.addEventListener('keydown', trapFocus)
})

onUnmounted(() => {
  modalRef.value?.removeEventListener('keydown', trapFocus)
})
</script>

<template>
  <div
    role="dialog"
    aria-modal="true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    @keydown.esc="$emit('close')"
  >
    <div ref="modalRef" class="bg-white rounded-lg overflow-hidden w-full max-w-3xl">
      <div class="relative pb-[56.25%]">
        <iframe
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/jNTZpfXYJa4"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-secondary hover:text-black font-bold text-xl"
      >
        &times;
      </button>
    </div>
  </div>
</template>

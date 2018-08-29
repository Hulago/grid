import { VNode, VNodeDirective } from 'vue';

function translateUpper(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
  const vm = vnode.context;
  if ((vm as any).i18n === false) {
    return binding.value;
  }

  let text = (vm as any).$t ? (vm as any).$t(binding.value) : binding.value;
  if (!text) {
    text = '';
  }

  el.innerText = text.toUpperCase();
}

export default {
  bind: translateUpper,
  update: translateUpper
};

import { VNode, VNodeDirective } from 'vue';

function translatePlaceholder(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
  const vm = vnode.context;
  if ((vm as any).i18n === false) {
    return binding.value;
  }

  let placeholder = (vm as any).$t ? (vm as any).$t(binding.value) : binding.value;
  if (!placeholder) {
    placeholder = '';
  }

  (el as any).placeholder = placeholder;
}

export default {
  bind: translatePlaceholder,
  update: translatePlaceholder
};

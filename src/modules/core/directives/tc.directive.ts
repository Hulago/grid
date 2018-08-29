import { VNode, VNodeDirective } from 'vue';

function translateCapitalize(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
  const vm = vnode.context;
  if ((vm as any).i18n === false) {
    return binding.value;
  }

  let text = (vm as any).$t ? (vm as any).$t(binding.value) : binding.value;

  if (!text) {
    text = '';
  } else {
    if (binding.arg === 'all') {
      text = text.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    } else {
      text = text.replace(/\w\S*/, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  }

  el.innerText = text;
}

export default {
  bind: translateCapitalize,
  update: translateCapitalize
};

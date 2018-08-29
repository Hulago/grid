import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { get } from 'lodash';
import { FormControl } from '../models/form-control.model';

export default (() => {
  const focusHandler = (fc: FormControl) => {
    fc.$focus = true;
    if (!fc.$touch) {
      fc.$touch = true;
    }

    fc.notifyParent();
  };

  const blurHandler = (fc: FormControl) => {
    fc.$focus = false;

    if (!fc.$touch) {
      fc.$touch = true;
    }

    fc.validate();
    fc.notifyParent();
  };

  const inputHandler = (fc: FormControl, event: any) => {
    fc.value = get(event, 'target.value', event);

    fc.validateDebounce();

    if (!fc.$dirty) {
      fc.$dirty = true;
    }

    fc.notifyParent();
  };

  return {
    priority: 3000,
    // When the bound element is inserted into the DOM...
    // tslint:disable-next-line:object-literal-shorthand
    bind: function bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
      const event = get(vnode, 'componentOptions.Ctor.options.model.event', 'input');

      (el as any).data = {
        inputFn: inputHandler.bind(this, binding.value),
        focusFn: focusHandler.bind(this, binding.value),
        blurFn: blurHandler.bind(this, binding.value)
      };

      if (vnode.componentInstance) {
        vnode.componentInstance.$on(event, (el as any).data.inputFn);
        vnode.componentInstance.$on('activate', (el as any).data.focusFn);
        vnode.componentInstance.$on('focus', (el as any).data.focusFn);
        vnode.componentInstance.$on('blur', (el as any).data.blurFn);
        vnode.componentInstance.$on('deactivate', (el as any).data.blurFn);
      } else {
        el.addEventListener(event, (el as any).data.inputFn);
        el.addEventListener('focus', (el as any).data.focusFn);
        el.addEventListener('blur', (el as any).data.blurFn);
      }
    },

    unbind: function unbind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
      const event = get(vnode, 'componentOptions.Ctor.options.model.event', 'input');

      if (vnode.componentInstance) {
        vnode.componentInstance.$off(event, (el as any).data.inputFn);
        vnode.componentInstance.$off('focus', (el as any).data.focusFn);
        vnode.componentInstance.$off('blur', (el as any).data.blurFn);
        vnode.componentInstance.$off('activate', (el as any).data.focusFn);
        vnode.componentInstance.$off('deactivate', (el as any).data.blurFn);
      } else {
        el.removeEventListener(event, (el as any).data.inputFn);
        el.removeEventListener('focus', (el as any).data.focusFn);
        el.removeEventListener('blur', (el as any).data.blurFn);
      }
    },

    componentUpdated: function componentUpdated(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
      const event = get(vnode, 'componentOptions.Ctor.options.model.event', 'input');
      const prop = get(vnode, 'componentOptions.Ctor.options.model.prop', 'value');

      (el as any).data = {
        inputFn: inputHandler.bind(this, binding.value),
        focusFn: focusHandler.bind(this, binding.value),
        blurFn: blurHandler.bind(this, binding.value)
      };

      if (vnode.componentInstance) {
        vnode.componentInstance.$on(event, (el as any).data.inputFn);
        vnode.componentInstance.$on('focus', (el as any).data.focusFn);
        vnode.componentInstance.$on('blur', (el as any).data.blurFn);
      } else {
        el.addEventListener(event, (el as any).data.inputFn);
        el.addEventListener('focus', (el as any).data.focusFn);
        el.addEventListener('blur', (el as any).data.blurFn);
      }
    }
  };
})();

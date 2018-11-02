import { basic } from '../mixins/basic';
import { observe } from '../mixins/observer/index';

export function create(sfc) {
  // map props to properties
  if (sfc.props) {
    sfc.properties = sfc.props;
    delete sfc.props;
  }

  // map mixins to behaviors
  if (sfc.mixins) {
    sfc.behaviors = sfc.mixins;
    delete sfc.mixins;
  }

  // map classes to externalClasses
  sfc.externalClasses = sfc.classes || [];
  delete sfc.classes;

  // add default externalClasses
  sfc.externalClasses.push('custom-class');

  // add default behaviors
  sfc.behaviors = sfc.behaviors || [];
  sfc.behaviors.push(basic);

  // add default options
  sfc.options = sfc.options || {};
  sfc.options.multipleSlots = true;
  sfc.options.addGlobalClass = true;

  // map field to form-field behavior
  if (sfc.field) {
    sfc.behaviors.push('wx://form-field');
  }

  observe(sfc);
  Component(sfc);
};

const LeshiLightWy0b01 = require('./devices/leshi.light.wy0b01.js');
const YeelinkLightColor3 = require('./devices/yeelink.light.color3.js');
const PhilipsLightBulb = require('./devices/philips.light.bulb.js');
const YeelinkLightLamp1 = require('./devices/yeelink.light.lamp1.js');
const YeelinkLightStrip4 = require('./devices/yeelink.light.strip4.js');
const YeelinkLightColor5 = require('./devices/yeelink.light.color5.js');
const YeelinkLightColor4 = require('./devices/yeelink.light.color4.js');
const YeelinkLightColor2 = require('./devices/yeelink.light.color2.js');

const allDevices = [LeshiLightWy0b01, YeelinkLightColor3, PhilipsLightBulb, YeelinkLightLamp1,
  YeelinkLightStrip4, YeelinkLightColor5, YeelinkLightColor4, YeelinkLightColor2
];


class LightFactory {

  static getDeviceClassForModel(deviceModel) {
    let deviceFactoryClass = null;
    deviceFactoryClass = allDevices.find(device => device.getDeviceModel() === deviceModel);
    return deviceFactoryClass;
  }

}

module.exports = LightFactory;

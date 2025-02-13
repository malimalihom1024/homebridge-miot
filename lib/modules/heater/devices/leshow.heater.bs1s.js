const HeaterDevice = require('../HeaterDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class LeshowHeaterBs1s extends HeaterDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "leshow.heater.bs1s";
  }

  getDeviceName() {
    return "Mi Smart Baseboard Heater 1S";
  }

  getDeviceMiotSpec() {
    return "https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:heater:0000A01A:leshow-bs1s:1";
  }

  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.POWER, 2, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE); //done
    this.addProperty(Properties.DEVICE_FAULT, 2, 2, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.NONE, [0, 4294967295, 1]); // done
    this.addProperty(Properties.TARGET_TEMPERATURE, 2, 3, PropFormat.FLOAT, PropAccess.READ_WRITE_NOTIFY, PropUnit.CELSIUS, [18, 28, 1]); //done
    this.addProperty(Properties.TEMPERATURE, 2, 4, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.CELSIUS, [-30, 100, 0.1]); //done
    this.addProperty(Properties.MODE, 2, 5, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Auto"
      },
      {
        "value": 1,
        "description": "Low"
      },
      {
        "value": 2,
        "description": "Max"
      }
    ]);
  }

  initDeviceActions() {
    // nothing special
  }


  /*----------========== CONFIG ==========----------*/


}

module.exports = LeshowHeaterBs1s;

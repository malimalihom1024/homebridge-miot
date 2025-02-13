const AirPurifierDevice = require('../AirPurifierDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class ZhimiAirPurifierVb2 extends AirPurifierDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  static getDeviceModel() {
    return "zhimi.airpurifier.vb2";
  }

  getDeviceName() {
    return "Xiaomi Mi Air Purifier Pro H";
  }

  getDeviceMiotSpec() {
    return "http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-vb2:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.POWER, 2, 2, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_LEVEL, 2, 4, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 1,
        "description": "Level1"
      },
      {
        "value": 2,
        "description": "Level2"
      },
      {
        "value": 3,
        "description": "Level3"
      },
      {
        "value": 0,
        "description": "Sleep"
      }
    ]);
    this.addProperty(Properties.MODE, 2, 5, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Auto"
      },
      {
        "value": 1,
        "description": "Sleep"
      },
      {
        "value": 2,
        "description": "Favorite"
      },
      {
        "value": 3,
        "description": "None"
      }
    ]);
    this.addProperty(Properties.CHILD_LOCK, 7, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.LED, 6, 1, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "brightest"
      },
      {
        "value": 1,
        "description": "glimmer"
      },
      {
        "value": 2,
        "description": "not bright"
      }
    ]);
    //this.addProperty(Properties.ALARM, 5, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE); // present in the specs but does not actually work, why?
    this.addProperty(Properties.FAVORITE_LEVEL, 10, 10, PropFormat.INT32, PropAccess.READ_WRITE, PropUnit.NONE, [0, 9, 1]);

    // READ ONLY
    this.addProperty(Properties.PM25_DENSITY, 3, 6, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.NONE, [0, 600, 1]);
    this.addProperty(Properties.RELATIVE_HUMIDITY, 3, 7, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.TEMPERATURE, 3, 8, PropFormat.FLOAT, PropAccess.READ_NOTIFY, PropUnit.CELSIUS, [-40, 125, 0.1]);
    this.addProperty(Properties.FILTER_LIFE_LEVEL, 4, 3, PropFormat.UINT8, PropAccess.READ_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);
    this.addProperty(Properties.FILTER_USED_TIME, 4, 5, PropFormat.UINT16, PropAccess.READ_NOTIFY, PropUnit.HOURS, [0, 18000, 1]);
    this.addProperty(Properties.FAVORITE_SPEED, 10, 7, PropFormat.INT32, PropAccess.READ, PropUnit.RPM, [300, 2300, 10]);
    this.addProperty(Properties.FAN_SPEED_RPM, 10, 8, PropFormat.INT32, PropAccess.READ, PropUnit.RPM, [0, 10000, 1]);
    this.addProperty(Properties.USE_TIME, 12, 1, PropFormat.INT32, PropAccess.READ, PropUnit.SECONDS, [0, 2147483647, 1]);
    this.addProperty(Properties.AQI_STATE, 13, 8, PropFormat.INT32, PropAccess.READ, PropUnit.NONE, [], [{
        "value": 0,
        "description": "AQI_GOOD_L"
      },
      {
        "value": 1,
        "description": "AQI_GOOD_H"
      },
      {
        "value": 2,
        "description": "AQI_MID_L"
      },
      {
        "value": 3,
        "description": "AQI_MID_H"
      },
      {
        "value": 4,
        "description": "AQI_BAD_L"
      },
      {
        "value": 5,
        "description": "AQI_BAD_H"
      }
    ]);
    this.addProperty(Properties.AQI_VALUE, 13, 2, PropFormat.INT32, PropAccess.READ, PropUnit.NONE, [0, 600, 1]);
  }

  initDeviceActions() {
    this.addAction(Actions.TOGGLE, 8, 1, []);
    this.addAction(Actions.TOGGLE_MODE, 8, 2, []);
  }


  /*----------========== CONFIG ==========----------*/

  autoModeValue() {
    return 0;
  }

  sleepModeValue() {
    return 1;
  }

  favoriteModeValue() {
    return 2;
  }


}

module.exports = ZhimiAirPurifierVb2;

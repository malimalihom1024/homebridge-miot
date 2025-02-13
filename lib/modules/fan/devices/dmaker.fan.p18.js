const FanDevice = require('../FanDevice.js');
const Properties = require('../../../constants/Properties.js');
const Actions = require('../../../constants/Actions.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class DmakerFanP18 extends FanDevice {
  constructor(model, deviceId, name, logger) {
    super(model, deviceId, name, logger);
  }

  /*----------========== DEVICE INFO ==========----------*/


  static getDeviceModel() {
    return "dmaker.fan.p18";
  }

  getDeviceName() {
    return "Mi Smart Fan 2";
  }

  getDeviceMiotSpec() {
    return "https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:fan:0000A005:dmaker-p18:1";
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    // READ/WRITE
    this.addProperty(Properties.POWER, 2, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_LEVEL, 2, 2, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
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
        "value": 4,
        "description": "Level4"
      }
    ]);
    this.addProperty(Properties.HORIZONTAL_SWING, 2, 4, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.HORIZONTAL_SWING_ANGLE, 2, 5, PropFormat.UINT16, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 30,
        "description": "30"
      },
      {
        "value": 60,
        "description": "60"
      },
      {
        "value": 90,
        "description": "90"
      },
      {
        "value": 120,
        "description": "120"
      },
      {
        "value": 140,
        "description": "140"
      }
    ]);
    this.addProperty(Properties.MODE, 2, 3, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE, [], [{
        "value": 0,
        "description": "Straight Wind"
      },
      {
        "value": 1,
        "description": "Natural Wind"
      }
    ]);
    this.addProperty(Properties.POWER_OFF_TIME, 2, 6, PropFormat.UINT32, PropAccess.READ_WRITE_NOTIFY, PropUnit.MINUTES, [0, 480, 1]);
    this.addProperty(Properties.CHILD_LOCK, 3, 1, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.LED, 2, 7, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.ALARM, 2, 8, PropFormat.BOOL, PropAccess.READ_WRITE_NOTIFY, PropUnit.NONE);
    this.addProperty(Properties.FAN_SPEED, 2, 10, PropFormat.UINT8, PropAccess.READ_WRITE_NOTIFY, PropUnit.PERCENTAGE, [0, 100, 1]);

    // WRITE ONLY
    this.addProperty(Properties.HORIZONTAL_MOVE, 2, 9, PropFormat.UINT8, PropAccess.WRITE, PropUnit.NONE, [], [{
        "value": 0,
        "description": "NO"
      },
      {
        "value": 1,
        "description": "LEFT"
      },
      {
        "value": 2,
        "description": "RIGHT"
      }
    ]);
  }

  initDeviceActions() {
    this.addAction(Actions.TOGGLE, 2, 1, []);
    this.addAction(Actions.TOGGLE_MODE, 4, 1, []);
    this.addAction(Actions.LOOP_GEAR, 4, 2, []);
  }


  /*----------========== CONFIG ==========----------*/

  straightWindModeValue() {
    return 0;
  }

  naturalModeValue() {
    return 1;
  }

  moveLeftValue() {
    return 1;
  }

  moveRightValue() {
    return 2;
  }


}

module.exports = DmakerFanP18;

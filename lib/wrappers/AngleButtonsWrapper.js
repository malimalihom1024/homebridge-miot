let Service, Characteristic, Accessory, HapStatusError, HAPStatus;
const BaseWrapper = require('./BaseWrapper.js');
const Properties = require('../constants/Properties.js');
const Constants = require('../constants/Constants.js');
const PropFormat = require('../constants/PropFormat.js');
const PropUnit = require('../constants/PropUnit.js');
const PropAccess = require('../constants/PropAccess.js');


class AngleButtonsWrapper extends BaseWrapper {
  constructor(serviceName, accessoryObj, prop, linkedProp, configuration, api, logger) {
    super(serviceName, accessoryObj, prop, linkedProp, configuration, api, logger);
  }


  /*----------========== GENERAL SETUP ==========----------*/

  initHapConstants() {
    Service = this.api.hap.Service;
    Characteristic = this.api.hap.Characteristic;
    Accessory = this.api.platformAccessory;
    HapStatusError = this.api.hap.HapStatusError;
    HAPStatus = this.api.hap.HAPStatus;
  }

  getWrapperType() {
    return "Angle Button";
  }


  /*----------========== SETUP SERVICE ==========----------*/


  prepareWrapper() {
    if (!this.hasValueList() && !this.hasValueRange()) {
      return false;
    }

    this.swingAnglesList = this.generateSwingAngleList(this.getConfiguration());
    // generate the switches
    if (this.swingAnglesList && this.swingAnglesList.length > 0) {
      this.swingAngleControlServices = new Array();
      this.swingAnglesList.forEach((swingAngle, i) => {
        let swingAngleVal = swingAngle.value;
        let swingAngleDesc = swingAngle.description;
        let propName = this.getProp().getName();
        let name = this.getWrapperName() || propName;

        let switchName = name + ' - ' + swingAngleDesc;
        let switchId = propName + 'ControlService' + swingAngleVal;

        let tmpSwingAngleSwitch = new Service.Switch(switchName, switchId);
        tmpSwingAngleSwitch
          .getCharacteristic(Characteristic.On)
          .onGet(() => {
            return this.isSwingAngleSwitchOn(swingAngleVal);
          })
          .onSet((value) => {
            this.setSwingAngleSwitchOn(value, swingAngleVal);
          });

        this.addAccessoryService(tmpSwingAngleSwitch);
        this.swingAngleControlServices.push(tmpSwingAngleSwitch);
      });
    }

    return true;
  }


  /*----------========== STATE SETTERS/GETTERS ==========----------*/

  isSwingAngleSwitchOn(angle) {
    if (this.isMiotDeviceConnected() && this.getDevice().isPowerOn()) {
      if (this.checkLinkedPropStatus()) {
        return this.getProp().getValue() === angle;
      }
    }
    return false;
  }

  setSwingAngleSwitchOn(state, angle) {
    if (this.isMiotDeviceConnected()) {
      if (state) {
        this.enableLinkedPropIfNecessary();
        this.getProp().setValue(angle);
        this.updateSwingAngleSwitches(angle);
      } else {
        this.disableLinkedPropIfNecessary();
      }
    } else {
      throw new HapStatusError(HAPStatus.SERVICE_COMMUNICATION_FAILURE);
    }
  }


  /*----------========== SERVICE PROTOCOL ==========----------*/

  updateWrapperStatus() {
    super.updateWrapperStatus(); // call super implementation

    this.updateSwingAngleSwitches();
  }


  /*----------========== STATE HELPERS ==========----------*/

  updateSwingAngleSwitches(activeVal) {
    if (this.swingAngleControlServices && this.swingAnglesList && this.swingAnglesList.length > 0) {
      activeVal = activeVal !== undefined ? activeVal : this.getProp().getValue(); // if activeVal specified from outside then use that, else get current prop value
      this.swingAngleControlServices.forEach((tmpSwingAngleSwitch, i) => {
        let swingAngle = this.swingAnglesList[i];
        let swingAngleVal = swingAngle.value;
        let isSwitchOn = (activeVal === swingAngleVal) && this.getDevice().isPowerOn() && this.checkLinkedPropStatus();
        tmpSwingAngleSwitch.getCharacteristic(Characteristic.On).updateValue(isSwitchOn);
      });
    }
  }


  /*----------========== GETTERS ==========----------*/


  /*----------========== HELPERS ==========----------*/

  generateSwingAngleList(userAngles) {
    if (this.hasValueList() && userAngles) {
      // simply get the swing angles list if supported
      return this.valueList();
    } else if (this.hasValueRange() && Array.isArray(userAngles)) {
      // if a range supported then generate the angles list specified by the user input
      let tmpAnglesList = new Array();
      userAngles.forEach((value, i) => {
        let parsedAngle = parseInt(value);
        if (parsedAngle === undefined || isNaN(parsedAngle)) {
          this.getLogger().warn(`Failed to parse angle ${parsedAngle}. Skipping angle button!`);
          return;
        }
        if (this.getProp().isValueWithinRange(parsedAngle) === false) {
          this.getLogger().warn(`Specified angle ${parsedAngle} is not within the supported range ${JSON.stringify(this.valueRange())}. Skipping angle button!`);
          return;
        }
        let tmpAngleObj = {};
        tmpAngleObj.value = parsedAngle;
        tmpAngleObj.description = parsedAngle.toString();
        tmpAnglesList.push(tmpAngleObj);
      });
      return tmpAnglesList;
    }
    return null;
  }


  /*----------========== LINKED PROP HELPERS ==========----------*/


  /*----------========== PROXY CAllS on ACCESSORY OBJ ==========----------*/


}


module.exports = AngleButtonsWrapper;

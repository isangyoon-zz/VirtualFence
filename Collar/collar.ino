#include <SoftwareSerial.h>
#include <Adafruit_GPS.h>
#include <EEPROM.h>
#include <DFPlayer_Mini_Mp3.h>

Adafruit_GPS GPS(&Serial);
SoftwareSerial MP3(2, 3);
SoftwareSerial XBEE(8, 9);

uint32_t fence;

void setup()
{
  Serial.begin(9600);

  // GPS
  GPS.begin(9600);
  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);
  // GPS.sendCommand(PMTK_API_SET_FIX_CTL_1HZ);
  GPS.sendCommand(PGCMD_ANTENNA);

  // 802.15.4
  XBEE.begin(9600);

  // Mp3 Player
  MP3.begin(9600);
  mp3_set_serial(MP3);
  mp3_set_volume(0);
}

uint32_t timer = millis();
void loop()
{
  if(GPS.newNMEAreceived())
  {
    if(!GPS.parse(GPS.lastNMEA()))
    {
      return;
    }
  }

  if(timer > millis())
  {
    timer = millis();
  }

  if(millis() - timer > 1000)
  {
    timer = millis();

    String packet = "[0," + String(GPS.latitudeDegrees, 4) + "," + String(GPS.longitudeDegrees, 4) + "," + String(GPS.altitude) + "," + String(GPS.speed)  + "]\r";
    XBEE.print(packet);
  }

  if(XBEE.available())
  {
    String data = XBEE.readStringUntil('\r');

    // parse data

    Serial.println(data);
  }

  delay(1000);
}

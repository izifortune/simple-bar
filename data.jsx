import Time from './lib/components/Time.jsx'
import DateDisplay from './lib/components/Date.jsx'
import Battery from './lib/components/Battery.jsx'
import Sound from './lib/components/Sound.jsx'
import Mic from './lib/components/Mic.jsx'
import Wifi from './lib/components/Wifi.jsx'
import Spotify from './lib/components/Spotify.jsx'
import Memory from './lib/components/Memory.jsx';

import { parseJson } from './lib/utils.js'

import { MicStyles, PillStyles, DateStyles, TimeStyles, BatteryStyles, WifiStyles, SoundStyles, SpotifyStyles } from './lib/styles/Styles.js'
import { Theme } from './lib/styles/Theme.js'

const refreshFrequency = 10000

const className = /* css */ `
  .simple-bar__error,
  .simple-bar__data {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 4px 5px;
    color: ${Theme.main};
    font-family: ${Theme.font};
    font-size: 11px;
    z-index: 1;
  }
  .simple-bar__data > *:not(:last-of-type) {
    margin-right: 5px;
  }
  ${DateStyles}
  ${TimeStyles}
  ${BatteryStyles}
  ${WifiStyles}
  ${SoundStyles}
  ${PillStyles}
  ${MicStyles}
  ${SpotifyStyles}
`

const command = 'bash simple-bar/lib/scripts/get_data.sh'

const render = ({ output, error }) => {
  if (!output || error) return <div className="simple-bar__error">Something went wrong...</div>
  const data = parseJson(output)
  if (!data) return <div className="simple-bar__error">JSON error...</div>
  const { time, battery, wifi, sound, mic, memory, spotify } = data
  return (
    <div className="simple-bar__data">
      <Spotify output={spotify} />
      <Battery output={battery} />
      <Sound output={sound} />
      <Mic output={mic} />
      <Wifi output={wifi} />
      <Memory output={memory}/>
      <DateDisplay />
      <Time />
    </div>
  )
}

export { command, refreshFrequency, className, render }

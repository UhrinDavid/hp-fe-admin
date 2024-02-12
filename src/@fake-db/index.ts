import mock from './mock'

import './auth/jwt'
import './calendar'

mock.onAny().passThrough()

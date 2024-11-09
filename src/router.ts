// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/content`
  | `/guide`
  | `/media`
  | `/prompt-generator`
  | `/tools`

export type Params = {
  
}

export type ModalPath = `/modals/coffee` | `/modals/reset`

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()

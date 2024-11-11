// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/contents`
  | `/contents/:id`
  | `/guide`
  | `/media`
  | `/prompt-generator`
  | `/tools`

export type Params = {
  '/contents/:id': { id: string }
}

export type ModalPath = `/modals/coffee` | `/modals/reset`

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()

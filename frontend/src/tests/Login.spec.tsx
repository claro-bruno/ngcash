import { it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

it('render Hello', () => {
  render(<App />)
})

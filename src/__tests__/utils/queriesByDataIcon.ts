import { queryHelpers } from "@testing-library/react";


const queryByDataIcon = queryHelpers.queryByAttribute.bind(
  null,
  'data-icon',
)

const queryAllByDataIcon = queryHelpers.queryAllByAttribute.bind(
  null,
  'data-icon',
)

function getAllByDataIcon(container:HTMLElement, icon:string, ...rest: any) {
  const els = queryAllByDataIcon(container, icon, ...rest)
  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [data-icon="${icon}"]`,
      container,
    )
  }
  return els
}

function getByDataIcon(container:HTMLElement, icon:string, ...rest: any) {
  // result >= 1
  const result = getAllByDataIcon(container, icon, ...rest)
  if (result.length > 1) {
    throw queryHelpers.getElementError(
      `Found multiple elements with the [data-icon="${icon}"]`,
      container,
    )
  }
  return result[0]
}

export { queryByDataIcon, queryAllByDataIcon, getByDataIcon, getAllByDataIcon }
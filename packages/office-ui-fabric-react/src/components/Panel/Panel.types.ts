import * as React from 'react';
import { IFocusTrapZoneProps } from '../../FocusTrapZone';
import { ILayerProps } from '../../Layer';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { PanelBase } from './Panel.base';

export interface IPanel {
  /**
   * Forces the panel to open.
   */
  open: () => void;

  /**
   * Forces the panel to dismiss.
   */
  dismiss: (ev?: React.KeyboardEvent<HTMLElement>) => void;
}
export interface IPanelProps extends React.HTMLAttributes<PanelBase> {
  /**
   * Optional callback to access the IPanel interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPanel>;

  /**
   * Whether the panel is displayed.
   * @defaultvalue false
   */
  isOpen?: boolean;

  /**
   * Has the close button visible.
   * @defaultvalue true
   */
  hasCloseButton?: boolean;

  /**
   * Whether the panel can be light dismissed.
   * @defaultvalue false
   */
  isLightDismiss?: boolean;

  /**
   * Whether the panel is hidden on dismiss, instead of destroyed in the DOM.
   * Protects the contents from being destroyed when the panel is dismissed.
   * @defaultvalue false
   */
  isHiddenOnDismiss?: boolean;

  /**
   * Whether the panel uses a modal overlay or not
   * @defaultvalue true
   */
  isBlocking?: boolean;

  /**
   * Determines if content should stretch to fill available space putting footer at the bottom of the page
   * @defaultvalue false
   */
  isFooterAtBottom?: boolean;

  /**
   * Header text for the Panel.
   * @defaultvalue ""
   */
  headerText?: string;

  /**
   * A callback function for when the panel is closed, before the animation completes.
   * If the panel should NOT be dismissed based on some keyboard event, then simply call ev.preventDefault() on it
   */
  onDismiss?: (ev?: React.SyntheticEvent<HTMLElement>) => void;

  /**
   * A callback function which is called after the Panel is dismissed and the animation is complete.
   */
  onDismissed?: () => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Panel
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Type of the panel.
   * @defaultvalue PanelType.smallFixedRight
   */
  type?: PanelType;

  /**
   * Custom panel width, used only when type is set to PanelType.custom.
   */
  customWidth?: string;

  /**
   * Aria label on close button
   */
  closeButtonAriaLabel?: string;

  /**
   * Optional parameter to provider the class name for header text
   */
  headerClassName?: string;

  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @defaultvalue The element.target that triggered the Panel.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Indicates if this Panel will ignore keeping track of HTMLElement that activated the Zone.
   * Deprecated, use `focusTrapZoneProps`.
   * @defaultvalue false
   * @deprecated Use `focusTrapZoneProps`.
   */
  ignoreExternalFocusing?: boolean;

  /**
   * Indicates whether Panel should force focus inside the focus trap zone.
   * If not explicitly specified, behavior aligns with FocusTrapZone's default behavior.
   * Deprecated, use `focusTrapZoneProps`.
   * @deprecated Use `focusTrapZoneProps`.
   */
  forceFocusInsideTrap?: boolean;

  /**
   * Indicates the selector for first focusable item.
   * Deprecated, use `focusTrapZoneProps`.
   * @deprecated Use `focusTrapZoneProps`.
   */
  firstFocusableSelector?: string;

  /**
   * Optional props to pass to the FocusTrapZone component to manage focus in the panel.
   */
  focusTrapZoneProps?: IFocusTrapZoneProps;

  /**
   * Optional props to pass to the Layer component hosting the panel.
   */
  layerProps?: ILayerProps;

  /**
   * Optional custom function to handle clicks outside the panel in lightdismiss mode
   */
  onLightDismissClick?: () => void;

  /**
   * Optional custom function to handle clicks outside this component
   */
  onOuterClick?: () => void;

  /**
   * Optional custom renderer navigation region. Replaces current close button.
   */
  onRenderNavigation?: IRenderFunction<IPanelProps>;

  /**
   * Optional custom renderer for header region. Replaces current title
   */
  onRenderHeader?: IPanelHeaderRenderer;

  /**
   * Optional custom renderer for body region. Replaces any children passed into the component.
   */
  onRenderBody?: IRenderFunction<IPanelProps>;

  /**
   * Optional custom renderer for footer region. Replaces sticky footer.
   */
  onRenderFooter?: IRenderFunction<IPanelProps>;

  /**
   * Custom renderer for content in the sticky footer
   */
  onRenderFooterContent?: IRenderFunction<IPanelProps>;

  /**
   * Deprecated property. Serves no function.
   * @deprecated Serves no function.
   */
  componentId?: string;
}

/**
 * Renderer function which takes an additional parameter, the ID to use for the element containing
 * the panel's title. This allows the `aria-labelledby` for the panel popup to work correctly.
 * Note that if `headerTextId` is provided, it **must** be used on an element, or screen readers
 * will be confused by the reference to a nonexistent ID.
 */
export interface IPanelHeaderRenderer extends IRenderFunction<IPanelProps> {
  /**
   * @param props - Props given to the panel
   * @param defaultRender - Default header renderer. If using this renderer in code that does not
   * assign `headerTextId` to an element elsewhere, it **must** be passed to this function.
   * @param headerTextId - If provided, this **must** be used as the ID of an element containing the
   * panel's title, because the panel popup uses this ID as its aria-labelledby.
   */
  (props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element | null;
}

export enum PanelType {
  /**
   * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fluid width.
   * Only used on Small screen breakpoints.
   * Small: 320-479px width (full screen), 16px Left/Right padding
   * Medium: \<unused\>
   * Large: \<unused\>
   * XLarge: \<unused\>
   * XXLarge: \<unused\>
   */
  smallFluid = 0,

  /**
   * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fixed width.
   * Small: 272px width, 16px Left/Right padding
   * Medium: 340px width, 16px Left/Right padding
   * Large: 340px width, 32px Left/Right padding
   * XLarge: 340px width, 32px Left/Right padding
   * XXLarge: 340px width, 40px Left/Right padding
   */
  smallFixedFar = 1,

  /**
   * Renders the panel in 'small' mode, anchored to the near side (left in LTR mode), and has a fixed width.
   * Small: 272px width, 16px Left/Right padding
   * Medium: 272px width, 16px Left/Right padding
   * Large: 272px width, 32px Left/Right padding
   * XLarge: 272px width, 32px Left/Right padding
   * XXLarge: 272px width, 32px Left/Right padding
   */
  smallFixedNear = 2,

  /**
   * Renders the panel in 'medium' mode, anchored to the far side (right in LTR mode).
   * Small: \<adapts to smallFluid\>
   * Medium: \<adapts to smallFixedFar\>
   * Large: 48px fixed left margin, 32px Left/Right padding
   * XLarge: 644px width, 32px Left/Right padding
   * XXLarge: 643px width, 40px Left/Right padding
   */
  medium = 3,

  /**
   * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fluid at XXX-Large breakpoint.
   * Small: \<adapts to smallFluid\>
   * Medium:  \<adapts to smallFixedFar\>
   * Large: \<adapts to medium\>
   * XLarge: 48px fixed left margin, 32px Left/Right padding
   * XXLarge: 48px fixed left margin, 32px Left/Right padding
   * XXXLarge: 48px fixed left margin, (no redlines for padding, assuming previous breakpoint)
   */
  large = 4,

  /**
   * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fixed at XXX-Large breakpoint.
   * Small: \<adapts to smallFluid\>
   * Medium: \<adapts to smallFixedFar\>
   * Large: \<adapts to medium\>
   * XLarge: 48px fixed left margin, 32px Left/Right padding
   * XXLarge: 48px fixed left margin, 32px Left/Right padding
   * XXXLarge: 940px width, (no redlines for padding, assuming previous breakpoint)
   */
  largeFixed = 5,

  /**
   * Renders the panel in 'extra large' mode, anchored to the far side (right in LTR mode).
   * Small: \<adapts to smallFluid\>
   * Medium: \<adapts to smallFixedFar\>
   * Large: \<adapts to medium\>
   * XLarge: \<adapts to large\>
   * XXLarge: 176px fixed left margin, 40px Left/Right padding
   * XXXLarge: 176px fixed left margin, 40px Left/Right padding
   */
  extraLarge = 6,

  /**
   * Renders the panel in 'custom' mode using customWidth, anchored to the far side (right in LTR mode).
   * Small: \<adapts to smallFluid\>
   * Medium: \<adapts to smallFixedFar\>
   * Large: 48px fixed left margin, 32px Left/Right padding
   * XLarge: 644px width, 32px Left/Right padding
   * XXLarge: 643px width, 40px Left/Right padding
   */
  custom = 7
}

export interface IPanelStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Is Panel open
   */
  isOpen?: boolean;

  /**
   * Is animation currently running
   */
  isAnimating?: boolean;

  /**
   * Is panel on right side
   */
  isOnRightSide?: boolean;

  /**
   * Is panel hidden on dismiss
   */
  isHiddenOnDismiss?: boolean;

  /**
   * Classname for FocusTrapZone element
   */
  focusTrapZoneClassName?: string;

  /**
   * Determines if content should stretch to fill available space putting footer at the bottom of the page
   */
  isFooterAtBottom?: boolean;

  /**
   * Based on state value setting footer to sticky or not
   */
  isFooterSticky?: boolean;

  /**
   * Panel has close button
   */
  hasCloseButton?: boolean;

  /**
   * Type of the panel.
   */
  type?: PanelType;

  /**
   * Optional parameter to provider the class name for header text
   */
  headerClassName?: string;
}

// TODO -Issue #5689: Comment in once Button is converted to mergeStyles
// export interface IPanelSubComponentStyles {
//   /**
//    * Styling for Icon child component.
//    */
//   // TODO: this should be the interface once we're on TS 2.9.2 but otherwise causes errors in 2.8.4
//   // button: IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles>;
//   button: IStyleFunctionOrObject<any, any>;
// }

export interface IPanelStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the overlay element.
   */
  overlay: IStyle;

  /**
   * Style for the hidden element.
   */
  hiddenPanel: IStyle;

  /**
   * Style for the main section element.
   */
  main: IStyle;

  /**
   * Style for the navigation container element.
   */
  commands: IStyle;

  /**
   * Style for the Body and Footer container element.
   */
  contentInner: IStyle;

  /**
   * Style for the scrollable content area container element.
   */
  scrollableContent: IStyle;

  /**
   * Style for the close button container element.
   */
  navigation: IStyle;

  /**
   * Style for the close button IconButton element.
   */
  closeButton: IStyle;

  /**
   * Style for the header container div element.
   */
  header: IStyle;

  /**
   * Style for the header inner p element.
   */
  headerText: IStyle;

  /**
   * Style for the body div element.
   */
  content: IStyle;

  /**
   * Style for the footer div element.
   */
  footer: IStyle;

  /**
   * Style for the inner footer div element.
   */
  footerInner: IStyle;

  // TODO -Issue #5689: Comment in once Button is converted to mergeStyles
  /**
   * Styling for subcomponents.
   */
  // subComponentStyles: IPanelSubComponentStyles;
}

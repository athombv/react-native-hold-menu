import React from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';

import MenuItems from './MenuItems';

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  CONTEXT_MENU_STATE,
} from '../../constants';

import {
  MENU_BACKGROUND_COLOR_LIGHT,
  MENU_BACKGROUND_COLOR_DARK,
} from './constants';

import styles from './styles';
import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { deepEqual } from '../../utils/validations';
import { leftOrRight } from './calculations';
import { HoldMenuProviderProps } from '../provider/types';

const AnimatedView = Animated.createAnimatedComponent(View);

const MenuListComponent = ({
  menuListStyle = {},
  useFontScale = true,
}: {
  menuListStyle?: HoldMenuProviderProps['menuListStyle'];
  useFontScale?: HoldMenuProviderProps['useFontScale'];
}) => {
  const { state, theme, menuProps } = useInternal();

  const [itemList, setItemList] = React.useState<MenuItemProps[]>([]);

  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );
    return calculateMenuHeight(
      menuProps.value.items.length,
      itemsWithSeparator.length,
      useFontScale
    );
  }, [menuProps]);
  const prevList = useSharedValue<MenuItemProps[]>([]);

  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );

    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length,
      itemsWithSeparator.length
    );

    const _leftPosition = leftOrRight(menuProps);

    const menuScaleAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    const opacityAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [
        { translateX: translate.beginningTransformations.translateX },
        { translateY: translate.beginningTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY },
      ],
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light'
          ? MENU_BACKGROUND_COLOR_LIGHT
          : MENU_BACKGROUND_COLOR_DARK,
    };
  }, [theme]);

  const setter = (items: MenuItemProps[]) => {
    setItemList(items);
    prevList.value = items;
  };

  useAnimatedReaction(
    () => menuProps.value.items,
    _items => {
      if (!deepEqual(_items, prevList.value)) {
        runOnJS(setter)(_items);
      }
    },
    [menuProps]
  );

  return (
    <AnimatedView
      style={[styles.menuContainer, messageStyles, menuListStyle]}
      needsOffscreenAlphaCompositing={true}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.menuInnerContainer,
          animatedInnerContainerStyle,
        ]}
      >
        <MenuItems items={itemList} />
      </Animated.View>
    </AnimatedView>
  );
};

const MenuList = React.memo(MenuListComponent);

export default MenuList;

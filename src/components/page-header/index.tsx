import { MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { router } from "expo-router"
import { colors } from "@/theme"

type Props = {
  title: string
  subtitle?: string
  rightButton?: {
    onPress: VoidFunction
    icon: keyof typeof MaterialIcons.glyphMap
  }
}

export function PageHeader({ title, rightButton, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={router.back}>
          <MaterialIcons name="arrow-back" size={32} color={colors.black} />
        </TouchableOpacity>

        {rightButton && (
          <TouchableOpacity activeOpacity={0.7} onPress={rightButton.onPress}>
            <MaterialIcons
              name={rightButton.icon}
              size={32}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

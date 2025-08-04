import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./styles"
import { colors } from "@/theme"

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}></LinearGradient>
  )
}

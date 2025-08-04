import { colors, fontFamily, fontSize } from "@/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: fontSize.xxs,
    color: colors.blue[300],
    fontFamily: fontFamily.regular,
  },
  value: {
    fontSize: fontSize.lg,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
})

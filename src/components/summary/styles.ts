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
    fontSize: fontSize.xs,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  value: {
    fontSize: fontSize.lg,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
})

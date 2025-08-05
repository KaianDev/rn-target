import { colors, fontFamily, fontSize } from "@/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  value: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  description: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
})

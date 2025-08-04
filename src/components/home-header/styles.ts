import { colors, fontFamily, fontSize } from "@/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 324,
    paddingHorizontal: 24,
    paddingBottom: 18,
    justifyContent: "flex-end",
    gap: 24,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  total: {
    fontSize: fontSize.xl,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  summary: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
